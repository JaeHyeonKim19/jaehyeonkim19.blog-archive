---
title: '동적 계획법 (Dynamic Programming)'
date: 2020-10-22 09:00:00 +0900
path: 'algorithm/20201022dynamic-programming'
---

## 동적 계획법

부분 문제 반복과 최적 구조를 가지고 있는 문제를 간단한 여러 개의 문제로 나누어 푸는 방법을 말한다. 부분 문제 반복과 최적 부분 구조의 의미는 다음과 같다.

- 부분 문제 반복: 부분 문제들의 답이 바뀌지 않고 계속 반복되는 것
- 최적 부분 구조: 큰 문제의 최적 솔루션에 작은 문제의 최적 솔루션이 포함되는 것

처음 봤을 땐 도대체 무슨 말인지 이해할 수 가 없다. 쉽게 말하면 기존 값을 재활용해서 풀 수 있는 문제는 기존 값을 재활용해서 풀겠다는 말이다. 대표적인 문제로 피보나치 수열이 있다. 해당 문제를 통해 살펴보자

피보나치 수열을 구하는 함수는 다음과 같이 작성할 수 있다.

```java
int fib(int n) {
	if(n == 0) {
		return 0;
	}else if() {
		return 1;
	} else {
		return fib(n - 1) + fib(n - 2);
	}
}
```

이때, fib(5)를 구하려고하면 다음과 같은 계산과정이 일어난다.

1. fib(5)
2. fib(4) + fib(3)
3. (fib(3) + fib(2)) + (fib(2) + fib(1))
4. ((fib(2) + fib(1)) + (fib(1) + fib(0))) + ((fib(1) + fib(0)) + fib(1))
5. (((fib(1) + fib(0)) + fib(1)) + (fib(1) + fib(0))) + ((fib(1) + fib(0)) + fib(1))

위 계산과정을 살펴보면 fib(3), fib(2), fib(1), fib(0)의 경우 계속 중복되어 계산되고 이는 전체적인 계산 속도를 떨어뜨린다. 이를 방지하기위해 각 함수의 계산 값을 저장해뒀다가 필요할 때 그 값을 꺼내서 쓰도록 하자. 함수의 실행 값을 저장는 배열 dp를 추가하면 다음과 같이 함수를 수정할 수 있다.

```java
int[] dp = new int[n + 1];
```

```java
int fib(int n) {
	if(n == 0) {
		return 0;
	}else if(n == 1) {
		return 1;
	}else if(dp[n] == 0) { // 해당 피보나치 수열 값이 아직 연산되지 않았을 경우
		dp[n] = fib(n - 1) + fib(n - 2);
		return dp[n];
	}else {
		return dp[n];
	}
}
```

이렇게 각 계산 값을 저장하면, 중복계산이 줄어들고 시간 복잡도는 O(n)이 된다.

## 예제

- [[자바]백준 11053 가장 긴 증가하는 부분 수열](https://jaehyeonkim19.github.io/codingtest/boj-11053-longest-increasing-subsequence/2020-10-21%2009:00:00%20+0900)
- [[자바]백준 2156 포도주 시식](https://jaehyeonkim19.github.io/codingtest/boj-2156-taste-wine/2020-10-22%2009:00:00%20+0900)

## 참고

- [위키백과 - 동적 계획법](https://ko.wikipedia.org/wiki/%EB%8F%99%EC%A0%81_%EA%B3%84%ED%9A%8D%EB%B2%95)
- [나무위키 - 동적 계획법](https://namu.wiki/w/%EB%8F%99%EC%A0%81%20%EA%B3%84%ED%9A%8D%EB%B2%95)
