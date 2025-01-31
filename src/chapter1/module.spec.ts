import { obj } from "./module"

// 특정 파일에서 export하는 모든 객체 및 함수를 모킹 하는 방법이다.
// 모킹한 객체의 구성을 아래와 같이 바꿀 수 있다.
// jest.mock("./module", () => ({
//     obj: { a: "B" }
// }))
// 모킹한 객체의 구성을 모두 변경하는 jest.mock의 factory 부분은 해당 파일이 export하는 모든 함수, 객체를
// 모킹하는 것 이기 때문에 위 처럼 바꾸고자 하는 특정 객체 혹은 함수를 재 정의 해주어야 한다.
// { obj: { a: "B" }, prop: "Hi" }와 같이 새로운 걸 추가해도 상관은 없다.

// 특정 파일에서 export하는 모든 객체 및 함수를 모킹할 때 위 방식으로 하여도 괜찮지만
// 다른 함수들도 가져와야 할 수 있기 때문에 직접 손타이핑을 해야 하는 귀찮음이 있을 수 있다.
// 이를 해결하기 위해 아래와 같이 할 수 있다.
// const originModule = jest.requireActual("./module")

// jest.mock("./module", () => ({
//     ...originModule,
//     obj: {
//         ...originModule.obj,
//         method: () => "Change method"
//     }
// }))
// jest.requireActual은 해당 파일에서 export하는 모든 객체 및 함수의 원본을 볼러오는 함수이다.
// originModule === import * as originModule from "./module"
// 이를 활용하여 변경이 필요한 부분만 수정하여 모킹할 수 있다.

// __mocks__ 폴더 아래에 있는 모킹할 파일을 복사한 파일들은 jest.mock시에 번잡하게 테스트 파일에 모두
// 새로 작성할 필요없이 구분하여 사용할 수 있도록 하게 해준다.
// 폴더명은 __mocks__로 반드시 지정하여야 하며, 타깃될 파일의 이름 또한 같아야만 한다.
// 그 결과로 아래의 jest.mock은 실제로 __mocks__/module.ts를 참조하게 된다.

jest.mock("./module")
test("모듈을 모킹", () => {
    // 특정 객체의 프로퍼티를 변경하려면 jest.replaceProperty를 사용할 수 있다.
    jest.replaceProperty(obj, "prop", { a: "replaced" })
    console.log(obj)
})