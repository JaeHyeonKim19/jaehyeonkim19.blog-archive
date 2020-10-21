---
title: '[자바]백준 2156 포도주 시식'
date: 2020-10-22 09:00:00 +0900
path: 'codingtest/20201022boj-2156-taste-wine'
---

## 문제

[포도주 시식](https://www.acmicpc.net/problem/2156)

## 풀이

DP를 활용해서 해결할 수 있는 문제다. 브루트포스로 모든 경우의 수를 검사하게되면 최악의 경우 2의 10000제곱으로 문제를 해결할 수 없다.

먼저 두 가지를 약속하고 시작하자.(변수명이 조금 아쉽지만 이해해주시면 감사하겠습니다.ㅜㅜ)
	- wineGlasses[i]: i번째 잔에 담긴 와인의 양을 의미한다.
	- accumulateAmounts[i]: i번째 잔까지 와인이 있을 때 최대로 마실 수 있는 와인의 양을 의미한다.

DP로 해결하기위해 규칙을 찾아보자.

0번 와인잔은 존재하지않으므로 `wineGlasses[0] = 0`, `accumulateAmounts[0] = 0`이다.
와인이 한 잔만 있을 때 최대로 마실 수 있는 와인의 양은 한 잔을 다 마셨을 때 이므로 `accumulateAmounts[1] = wineGlasses[1]`이다.
와인이 두 잔 있을 때는 최대로 마실 수 있는 와인의 양은 두 잔을 모두 마셨을 때 이므로 `accumulateAmounts[2] = wineGlasses[1] + wineGlasses[2]`이다.
와인이 세 잔 있을 때는 경우의 수가 나뉜다. 문제 조건에 따르면 3잔은 연속으로 마실 수 없기 때문에 다음과 같은 3가지 경우를 고려해야한다.
	1. 첫 번째, 두 번째 와인을 마시는 경우
	2. 첫 번째, 세 번째 와인을 마시는 경우
	3. 두 번째, 세 번째 와인을 마시는 경우
우리는 최대로 마시는 양을 알아야하기 때문에 위 3가지 경우의 수 중 가장 마시는 양이 많은 경우를 고르면 된다. 위 각각의 경우 `accmulateAmounts[3]`의 값을 코드로 다음과 같이 나타낼 수 있다.
	1. accumulateAmounts[3] = wineGlasses[1] + wineGlasses[2] = accmulateAmounts[2]
	2. accumulateAmounts[3] = wineGlasses[1] + wineGlasses[3] = accmulateAmounts[1] + wineGlasses[3]
	3. accmulateAmounts[3] = wineGlasses[2] + wineGlasses[3] = accmulateAmounts[0] + wineGlasses[2] + wineGlasses[3]
규칙이 눈에 보이는가 위 식을 일반화 해보자
	1. accumulateAmounts[i] = accmulateAmounts[i - 1]
	2. accumulateAmounts[i] = accmulateAmounts[i - 2] + wineGlasses[i]
	3. accmulateAmounts[i] = accmulateAmounts[i - 3] + wineGlasses[i - 1] + wineGlasses[i]
우리는 위 3가지 값중 최대값만 고르면 되기때문에 `accumulateAmounts[i]`는 다음과 같이 나타낼 수 있다.
```java
accmulateAmounts[i] = Math.max(accumulateAmounts[i - 1], Math.max(accumulateAmounts[i - 2] + wineGlasses[i], accumulateAmounts[i - 3] + wineGlasses[i - 1]+ wineGlasses[i]));
```
위 식을 통해서 `accmulateAmounts[n]`의 값을 구해서 출력해주면 문제를 해결할 수 있다. 이 문제의 경우 DP를 활용해서 O(n)의 복잡도로 문제를 해결할 수 있었다. 코드는 아래를 참고하자.

## 코드

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;
import java.io.IOException;

public class Main{
	public static void main(String args[]) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int[] wineGlasses = new int[n + 1];
		for(int i = 1; i < wineGlasses.length; i++) {
			wineGlasses[i] = Integer.parseInt(br.readLine());
		}
		
		int[] accumulateAmounts = new int[wineGlasses.length];
		accumulateAmounts[0] = 0;
		accumulateAmounts[1] = wineGlasses[1];
		if(accumulateAmounts.length >= 3) {
			accumulateAmounts[2] = accumulateAmounts[1] + wineGlasses[2];
		}
		for(int i = 3; i < wineGlasses.length; i++) {
			accumulateAmounts[i] = Math.max(accumulateAmounts[i - 1], Math.max(accumulateAmounts[i - 2] + wineGlasses[i], accumulateAmounts[i - 3] + wineGlasses[i - 1]+ wineGlasses[i]));
		}
		
		System.out.print(accumulateAmounts[accumulateAmounts.length - 1]);
	}
}
```
