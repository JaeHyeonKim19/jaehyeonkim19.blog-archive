---
title: '[자바]백준 11047 동전 0'
date: 2020-10-23 09:00:00 +0900
path: codingtest/20201023boj-11047-coin-0'
---

## 문제

[백준 11047번 동전 0](https://www.acmicpc.net/problem/11047)

## 풀이

그리디 알고리즘 문제. 여러가지 동전이 있을 때 최소한의 동전 개수로 주어진 값을 채우는 문제이다. 가장 비싼 동전부터 최대의 갯수를 골라가며 금액을 채워가면 된다. 코드는 아래와 같다.

## 코드

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main{
	public static void main(String args[]) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		int k = Integer.parseInt(st.nextToken());
		int[] coins = new int[n];
		for(int i = 0; i < n; i++) {
			coins[i] = Integer.parseInt(br.readLine());
		}

		int answer = 0;
		for(int i = n - 1; i >= 0; i--) {
			if(k / coins[i] > 0) {
				answer += k / coins[i];
				k %= coins[i];
			}
		}

		System.out.print(answer);
	}
}
```
