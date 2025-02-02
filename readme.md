## 목표  
>테스트 코드를 적어도 봤을 때 이해는 할 수 있고, 유닛 테스트는 아니여도 통합, E2E 테스트는 짤 수 있도록 하자.

## Chapter 1  

1. mocking된 함수, 객체는 테스트가 종료 될 때까지 추적 된다. 그러므로 이후에 테스트 로직에 영향이 가니 이를 유의해서 작성하도록 하자.
2. jest.fn은 새로운 추적을 만드는 것이고, spyOn은 해당 객체에 추적을 심는 것이다. jest.fn에 경우에는 1번 사항이 적용되지 않는다.
3. 비동기 함수 테스트 시, await를 사용하지 않고 expect.resolves, expect.rejects를 사용한다면 반드시 return을 붙여주자. 
4. setTimeout, setInterval 같은 webAPI를 사용하는 함수들은 test 함수의 매개값 done을 받아와 호출해주어야 실제로 timer의 시간을 기다려 준다. 하지만 콜백 함수에 경우, 테스트 시 모두 async로 바꿔서 하는 것을 추천한다.
5. spyOn으로 특정 객체의 함수에 추적을 심게 되었을 때, 1번과 같은 상황이 발생 하는 것을 방지 하기 위한 함수를 제공 해주는데 함수 이름과 동작 방식은 다음과 같다.  
```
const spyFn = jest.spyOn(obj, 'fn')

// Time, With 초기화
// toHaveBeenCalledTimes 같은 함수 호출 횟수 같은 메타 데이터만 초기화
spyFn.mockClear()

// mockClear + mockImplementation(() => {})
// mockClear와 mockImplementation을 () => {}로 만듬
// 원래 추적하던 함수의 원형으로 돌아가는게
spyFn.mockReset() 

// 해당 함수의 추적을 모두 초기화
spyFn.mockRestore()
```  
+ spy를 개별적으로 위 예시 처럼 하나씩 없앨 수 있지만 jest에서 이를 한 번에 모두 관리 할 수 있도록 다음과 같은 함수를 지원한다.  
```
// 존재하는 모든 spy를 clear
// Time, With 초기화
jest.clearAllMocks()

// 존재하는 모든 spy를 reset
// clearAllMocks + mockImplementation(() => {})
// clearAllMocks mockImplementation을 () => {}로 만듬
jest.resetAllMocks()

// 존재하는 모든 spy를 restore
// 존재하는 모든 추적을 초기화
jest.restoreAllMocks()
```   

6. 5번과 같이 모든 테스트에 clear, reset, restore를 적재적소에 넣어주는 것도 좋지만 그만큼 중복이 많이 생긴다. 이를 방지 하기 위해 jest의 lifecycle에 관여할 수 있도록 기능을 제공하는데 함수 이름과 동작 방식은 다음과 같다.
```
// 맨 처음에 한 번
beforeAll(() => {})
// 매 번 실행 전에
beforeEach(() => {})

// 매 번 실행 후에
afterEach(() => {})
// 맨 마지막에 한 번
afterAll(() => {})
```  
7. describe는 테스트를 묶는 단위 이다. beforeEach, afterEach, beforeAll, afterAll과 같은 사전, 사후의 실행 되는 함수들은 모든 작업 단위에서 나뉘기 때문에 이를 주의 하면서 작성 해야 함.  
8. it과 test 함수는 동일한 동작을 한다.  
9. setTimeout나 Promise 함수 같이 뒤에 콜백이 실행 되는 함수들은 실제 시간을 기다리기 너무 오래 걸리는 함수가 종종 있다. 이런 불편한 점을 해소하기 위해 jest에서는 직접 micro queue와 macro queue에 있는 stack들을 바로 call stack으로 올리게 해주는 함수들을 제공하고 있다. 자세한건 jest 공식 문서를 확인 하자.  
+ 이러한 함수들은 jest.useFakeTimers와 함께 사용되어야 한다. 아니면 오류 남  
- https://jestjs.io/docs/timer-mocks  
10. 0.1 + 0.2 = 0.300000000004와 같이 javascript에선 부동 소수점 관련한 문제가 있다. 이 때문에 정밀한 테스트가 힘들 수 있는 데, 이를 보안하기 위해 jest에선 expect.toBeCloseTo를 지원한다
11. setTimeout나 Promise 함수를 테스트 할 때, .then(() => done()) 혹은 setTimeout(()=>{done()}, 1000) 처럼 로직 내부에서 expect를 호출하고 done을 호출하여 검증을 해야 할 때가 있을 수도 있다. 이 때 expect는 실행 되어도, 돼지 않아도 성공하기 때문에 expect.assertions 함수로 expect가 얼만큼 호출 되었는지 판별하자.  
12. jest.fn, jest.spyOn과 같은 함수 추적 객체는 mock이라는 프로퍼티에서 해당 함수가 얼만큼 호출되었는지, 어떤 인수를 받았는지, 몇 번째로 호출 되었는지 등의 다양한 정보를 담고 있다. 테스트를 정밀하게 짜려면 mock 객체를 로그로 찍어 확인하고 잘 써먹자.  
13. jest-extended는 jest 함수의 확장판으로 같은 동작을 축약하여 가독성을 높여주는 패키지 이다. 설정 방법은 공부->test->setup 폴더를 확인하자.
14. 특정한 파일 자체를 모킹하려면 jest.mock 함수를 이용하여 모킹할 수 있다. 그 방식에는 여러가지가 존재하며, 그 중 __mocks__ 폴더로 분할하여 실제 구현체와 모킹 구현체를 나누어 관리하는 것이 가독성과 관리면에서 모두 좋은 방법 같다. 하지만 __mocks__ 폴더 아래에 있는 모킹 구현체들은 전역적으로 영향을 주게 되니 특정 테스트에서만 필요하다면 다른 방법을 사용하도록 하고, 이를 위한 자세한 설명과 다른 방식은 module.spec.ts파일을 참고하자.  
15. setInterval와 같이 무한히 실행되는 코드가 테스트 로직이 아닌 실제 구현체에 존재 할 경우, 어느 부분에서 오류가 발생 했는지 추적하기 어렵다. 이를 위해 jest 실행 옵션 중 --detectOpenHandles를 사용하여 손쉽게 추적 할 수 있다. 이는 단순히 setInterval에 국한 되는 것이 아니라 API 요청 시 응답을 기다리는데 시간이 오래 걸리는 로직, DB Connection 등에서도 발견하기 쉬우니 반드시 afterAll에 모든 연결을 종료하는 로직을 넣어주자.   

## Chapter 2  

1. description은 함수의 이름을 기반으로 추론을 할 수 있게 하는 것 보단, 결과나 동작으로 추론이 가능하게 끔 작성하는 것이 좋다.
// req.inauthenticated가 true면 next를 호출한다 -> 로그인을 했으면 next를 호출한다    
2. 테스트를 작성하고 실패하는 경우를 먼저 테스트 해라.  
3. redirect에 경우 매개값으로 라우트가 들어오기 때문에 기대값 또한 redirect되는 위치를 넣어주면 된다.
// expect(res.redirect).toHaveBeenCalledWith(`/?error=${route}`)  

## 경험  

+ NestJS에서 unit 테스트를 작성하던 중, 같은 방식으로 동작하고 작성 된 모듈임에도 모킹 시, 프로토타입 객체를 대상으로 해야하는 경우가 있었다.  
테스트 모듈 작성 부 비교
```
NovelModule

const module: TestingModule = await Test.createTestingModule({
    imports: [NovelModule],
    providers: [
        NovelService,
        {
            provide: MailService,
            useValue: {
                sendAlertEmail: jest.fn(),
                sendReminderEmail: jest.fn(),
                sendEmail: jest.fn(),
            }
        },
        NovelRepository,
        RequesterRepository,
    ],
}).compile()
```  
```
NovelStatusModule

const module: TestingModule = await Test.createTestingModule({
    imports: [NovelStatusModule],
    providers: [
        NovelStatusService,
        NovelStatusRepository,
        {
            provide: MailService,
            useValue: {
                sendReminderMail: jest.fn(),
            }
        }
    ],
}).compile()
```  
심지어 둘 다 실제 구현부에서도 똑같이 DI하고 사용하지만 모킹 방식은 살짝 다르다.  
```
NovelModule

const sendEmailSpy = jest
.spyOn(Object.getPrototypeOf(mailService), "sendEmail")
.mockImplementation(() => {})
```  
```
NovelStatusModule

const sendEmailSpy = jest
.spyOn(mailService as any, "sendEmail")
.mockImplementation(() => {})
```  
NovelStatusModule는 저 상태로도 mockImplementation로 모킹 된 로직이 실행 되지만 NovelModule는 Object.getPrototypeOf로 프로토타입 객체를 이용해 모킹하지 않을 경우 모킹 된 로직이 아니라 실제 구현부 로직이 실행된다. 이유는 정확히 모르겠지만 이럴 수 있다는 점을 인지하자.  
