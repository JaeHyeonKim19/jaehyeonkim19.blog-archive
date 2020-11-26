---
title: '자바 Optional'
date: 2020-11-26 09:00:00 +0900
path: java/20201126java-optional'
---

## Java Optional 바르게 쓰기

Brian Goetz는 스택오버플로우에서 Optional을 만든 의도에 대해 다음과 같이 말했다.

> … it was not to be a general purpose Maybe type, as much as many people would have liked us to do so. Our intention was to provide a limited mechanism for library method return types where there needed to be a clear way to represent “no result” … 
>
> Optional은 많은 사람들이 우리(자바 언어 설계자)에게 기대했던 범용적인 Maybe 타입과는 다르다. 라이브러리 메서드가 반환할 결과값이 ‘없음’을 명백하게 표현할 필요가 있는 곳에서 제한적으로 사용할 수 있는 메커니즘을 제공하는 것이 Optional을 만든 의도였다.

1. isPresent()-get() 대신 orElse()/orElseGet()/orElseThrow()
2. orElse(new ...) 대신 orElseGet(() -> new ...)
3. 단지 값을 얻을 목적이라면 Optional 대신 null 비교
4. Optional 대신 비어있는 컬렉션 반환
5. Optional을 필드로 사용 금지
6. Optional을 생성자나 메서드 인자로 사용 금지
7. Optional을 컬렉션의 원소로 사용 금지
8. of(), ofNullable() 혼동 주의
9. Optional<T> 대신 OptionalInt, OptionalLong, OptionalDouble

## 참고

[http://homoefficio.github.io/2019/10/03/Java-Optional-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0/](http://homoefficio.github.io/2019/10/03/Java-Optional-%EB%B0%94%EB%A5%B4%EA%B2%8C-%EC%93%B0%EA%B8%B0/)
[https://www.daleseo.com/java8-optional-effective/](https://www.daleseo.com/java8-optional-effective/)