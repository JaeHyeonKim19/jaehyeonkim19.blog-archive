---
title: '그런 REST API로 괜찮은가'
date: 2020-01-09 08:26:28 -0400
path: 'network/20200109restapi'
---

> 본 글은 이응준님께서 DEVIEW2017에서 발표하신 '그런 REST API로 괜찮은가'를 공부목적으로 글로 옮긴 것입니다. 추후 문제가 된다면 즉각 삭제하겠습니다. 영상을 보고 싶으신분들은 [영상링크](https://tv.naver.com/v/2292653)를 클릭해주세요.

많은 개발자들은 REST API에 대해서 들어본 적이 있고 또 사용하고 있는 경우가 많다. 하지만 REST API가 무엇인지 설명할 수 있는가? 또는 '이거 REST API 아니야'라는 이야기를 들었을 때 반박할 수 있는가? 필자는 그렇지 않다. 한 번 같이 REST API에 대해서 알아보도록 하자.

REST = REpresentational State Transfer

REST: a way of providing interoperability between computer systems on the internet.

REST의 역사

시작은 WEB(1991)

어떻게 인터넷에서 정보를 공유할 것인가?

팀 버너스리의 해답은?
정보들을 하이퍼텍스트로 연결한다.
표현 형식: HTML
식별자: URL
전송 방법: HTTP

HTTP/1.0 (1994-1996)

Roy T. Fielding: "How do I improve HTTP without breaking the web?"
해결책: HTTP Object Model(4년 후에 REST란 이름으로 발표됨)

REST(1998)
Roy T. Fielding Microsoft Research에서 발표

REST(2000)
Roy T. Fielding 박사 논문으로 발표
"Architectural Styles and the Design of Network-based Software Architectures"

1998년에 Microsoft에서 SOAP를 만들지만 사람들에게 복잡하고 어렵다는 인식 때문에 인기가 낮아져감.

결국 2006년 AWS가 자사 API의 사용량의 85%가 REST임을 밝힘
2010년 Salesforce.com REST API 추가(기존 SOAP로 API 제공)

REST의 승리

그런데?

CMIS(2008)
CMS를 위한 표준
EMC, IBM, Microsoft등이 함께 작업
**REST 바인딩 지원**

하지만 CMIS를 본 로이필딩은 "No REST in CMIS"

Microsoft REST API Guidelines(2016)

- uri는 https://{serviceRoot}/{collection}/{id} 형식이어야한다.
- GET, PUT, DELETE, POST, HEAD, PATCH, OPTIONS를 지원해야한다.
- API 버저닝은 Major.minor로 하고 uri에 버전 정보를 포함시킨다.
- 등등...

하지만 이걸 본 로이필딩은 "s/REST API/HTTP API/" 그냥 HTTP API라고 해야함.

그리고 블로그에 "REST APIs must be hypertext-driven"라고 작성
버저닝에 대해서는 "REST API를 위한 최고의 버저닝 전략은 버저닝을 안 하는 것"이라고 대답

사람들이 말하는 REST API와 창시자인 로이필딩이 말하는 REST API는 큰 차이를 보였다. 왜 그런지 따져보자.

REST API: REST 아키텍쳐 스타일을 따르는 API
REST: 분산 하이퍼미디어 시스템(예: 웹)을 위한 아키텍쳐 스타일
아키텍쳐 스타일: 제약조건의 집합 -> 제약조건들을 모두 지켜야 REST라고 할 수 있다.

REST를 구성하는 스타일

- client-server
- stateless
- cache
- **uniform interface** (대체로 잘 지켜지지만 uniform interface가 잘 지켜지지 않는다.)
- layered system
- code-on-demand(optional) (ex. javascript)

Uniform Interface의 제약조건

- identification of resources
- manipulation of resources through representations
- **self-descriptive messages**
- **hypermedia as the engine of application state(HATEOAS)**

Self-descriptive message: 메세지는 스스로를 설명해야한다. 메세지를 보고 메세지가 모두 해석이 되어야한다.
HATEOAS: 에플리케이션의 상태는 Hyperlink를 이용해 전이되어야한다.

왜 Uniform Interface?
독립적 진화!

- 서버와 클라이언트가 각각 독립적으로 진화한다.
- 서버의 기능이 변경되어도 클라이언트를 업데이트할 필요가 없다.
- REST를 만들게 된 계기: "How do I improve HTTP without breaking the Web."

실제로 REST가 지켜지고 있는 사례? 웹!

- 웹 페이지를 변경했다고 웹 브라우저를 업데이트할 필요는 없다.
- 웹 브라우저를 업데이트했다고 웹 페이지를 변경할 필요도 없다.
- HTTP 명세가 변경되어도 웹은 잘 동작한다.
- HTML 명세가 변경되어도 웹은 잘 동작한다.

물론 페이지가 조금 깨질순 있지만 동작은 한다!
모바일 앱처럼 업데이트를 할 필요가 없다.(모바일앱과 서버가 REST 아키텍쳐를 따르지 않는다.)

이 모든 것은 공짜로 이루어진 것이 아니라 피땀흘려 노력한 덕분이다!
누가?

- W3C Working groups
- IETF Working groups
- 웹 브라우저 개발자들
- 웹 서버 개발자들

이 정도의 노력을 합니다.

- HTML5 첫 초안에서 권고안 나오는데까지 **6년**
- HTTP/1.1 명세 개정판 작업하는데 **7년**

상호운영성(interoperability)에 대한 집착

- referer 오타지만 안 고침
- charset 잘못 지은 이름이지만 안 고침
- HTTP 상태 코드 416 포기함(I'm a teapot)
- HTTP/0.9 아직도 지원함 (크롬, 파이어폭스)

왜 안고치는가? 고치는 순간 꺠져서 하위호환성이 사라지기 때문

이런 노력이 없었다면 웹 또한 REST를 지킬 수 없었다.

REST가 웹의 독립적 진화에 도움을 주었나?

- HTTP에 지속적으로 영향을 줌
- Host 헤더 추가
- 길이 제한을 다루는 방법이 명시 (414 URI Too Long 등)
- URI에서 리소스의 정의가 추상적으로 변경됨: "식별하고자 하는 무언가" 예전에는 "문서의 위치"였음
- 기타 HTTP와 URI에 많은 영향을 줌
- HTTP/1.1 명세 최신판에서 REST에 대한 언급이 들어감
- Reminder: Roy T. Fielding이 HTTP와 URI 명세의 저자 중 한명. 즉 본인이 옳다고 생각하는대로 만든 것.

그럼 REST는 성공?

- REST는 웹의 독립적 진화를 위해 만들어졌다
- 웹은 독립적으로 진화하고 있다
  성공!

그런데 REST API는?

- REST API는 REST 아키텍쳐 스타일을 따라야한다.
- 오늘 날 스스로 REST API라고 하는 API들의 대부분이 REST 아키텍쳐 스타일을 따르지 않는다.

REST API도 제약조건들을 다 지켜야 하는가?
로이필딩이 그렇다고 함. "하이퍼텍스트를 포함한 self-descriptive한 메시지의 uniform interface를 통해 리소스에 접근하는 API"

원격 API가 꼭 REST API여야 하는가?
아니다. 로이필딩 왈 "시스템 전체를 통제할 수 있다고 생각하거나, 진화에 관심이 없다면, REST에 대해 따지느라 시간을 낭비하지마라"

그럼 이제 어떻게 할까?

- REST API를 구현하고 REST API라고 부른다.
- REST API구현을 포기하고 HTTP API라고 부른다.
- REST API가 아니지만 REST API라고 부른다.(현재 상태)

로이필딩은 "제약조건을 따르던지 아니면 다른 단어를 사용하라"고 이야기 하고있다.

왜 API는 REST하기 어려울까?

| \*           | 흔한 웹 페이지 | HTTP API  |
| ------------ | -------------- | --------- |
| Protocol     | HTTP           | HTTP      |
| 커뮤니케이션 | 사람-기계      | 기계-기계 |
| Media Type   | HTML           | JSON      |

| \*               | HTML          | JSON              |
| ---------------- | ------------- | ----------------- |
| Hyperlink        | 됨(a 태그 등) | 정의되어있지 않음 |
| Self-descriptive | 됨(HTML 명세) | 불완전\*          |

불완전\* : 문법 해석은 가능하지만, 의미를 해석하려면 별도로 문서가(API 문서 등) 필요하다.

HTML은 Self-descriptive하고 HATEOAS를 만족하지만 JSON은 둘 다 만족하지 못한다.

그런데 Self-descriptive와 HATEOAS가 독립적 진화에 어떻게 도움이 될까?

Self-descriptive: 확장 가능한 커뮤니케이션: 서버나 클라이언트가 변경되더라도 오고가는 메시지는 언제나 self-descriptive 하므로 언제나 해석이 가능하다.

HATEOAS: 애플리케이션 상태 전이의 late binding: 어디서 어디로 전이가 가능한지 미리 결정되지 않는다. 어떤 상태로 전이가 완료되고 나서야 그 다음 전이될 수 있는 상태가 결정된다. 쉽게 말해서 링크는 동적으로 변경될 수 있다.

그럼 JSON요청 또한 REST로 바꿔보자

- Self-descriptive
  - 방법1: Media type
    1. 미디어 타입을 하나 정의한다.
    2. 미디어 타입 문서를 작성한다. 이 문서에 "id"가 뭐고 "title"이 무엇인지 의미를 정의한다.
    3. IANA에 미디어 타입을 등록한다. 이 때 만든 문서를 미디어 타입의 명세로 등록한다.
    4. 이제 이 메시지를 보는 사람은 명세를 찾아갈 수 있으므로 이 메시지의 의미는 온전히 해석할 수 있다.
  - 단점: 매번 Media type을 정의해야한다.
  - 방법2: Profile
    1. "id"가 뭐고 "title"이 무엇인지 의미를 정의한 명세를 작성한다.
    2. Link 헤더에 profile relation으로 해당 명세를 링크한다.
    3. 이제 메시지를 보는 사람은 명세를 찾아갈 수 있으므로 이 문서의 의미를 온전히 해석할 수 있다.
  - 단점:
    1. 클라이언트가 Link 헤더(RFC5988)와 profile(RFC6906)을 이해해야한다.
    2. Content negotiation을 할 수 없다.
- HATEOAS
  - 방법1: data에 대양한 방법으로 하이퍼링크를 표현한다.
  - 단점: 링크를 표현하는 방법을 직접 정의해야한다.
  - JSON으로 하이퍼링크를 표현하는 방법을 정의한 명세들을 활용한다.
    - JSON API
    - HAL
    - UBER
    - Siren
    - Collection+json
    - ...
  - 단점: 기존 API를 많이 고쳐야한다.
  - 방법2: HTTP 헤더로 Link, Location 등의 헤더로 링크를 표현한다.
  - 단점: 정의된 relation만 활용한다면 표현에 한계가 있다.
  - HATEOAS의 경우 data, 헤더 모두 활용하면 좋습니다.

정리

- 오늘날 대부분의 "REST API"는 사실 REST를 따르지 않고 있다.
- REST의 제약조건 중에서 특히 Self-descriptive와 HATEOAS를 잘 만족하지 못한다.
- REST는 긴 시간에 걸쳐(수십년) 진화하는 웹 애플리케이션을 위한 것이다.
- REST를 따를 것인지는 API를 설계하는 이들이 스스로 판단하여 결정해야한다.
- REST를 따르겠다면, Self-descriptive와 HATEOAS를 만족시켜야한다.
  - Self-descriptive는 custom media type이나 profile link relation 등으로 만족시킬 수 있다,
  - HATEOAS는 HTTP 헤더나 본문에 링크를 담아 만족시킬 수 있다.
- REST를 따르지 않겠다면, "REST를 만족하지 않는 REST API"를 뭐라고 부를지 결정해야 할 것이다.
  - HTTP API라고 부를 수도 있고
  - 그냥 이대로 REST API라고 부를 수도 있다.(~~roy가 싫어합니다.~~)
