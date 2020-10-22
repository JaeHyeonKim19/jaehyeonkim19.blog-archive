---
title: '[자바]백준 5430 AC'
date: 2020-10-22 09:00:00 +0900
path: codingtest/20201022boj-5430-ac'
---

## 문제

[백준 5430번 AC](https://www.acmicpc.net/problem/5430)

## 풀이

주어진 수행할 함수에 따라 배열을 뒤집거나 첫 번째 원소를 제거하는 작업을 수행하는 문제이다.

하지만 문제의 조건에따라 실제로 배열을 뒤집게되면 `O(배열의 길이(최대 100,000) * 함수의 길이(최대 100,000))`의 복잡도를 가지게 되어 시간 내 문제를 해결할 수 없다. 실제로 뒤집지는 않지만 뒤집어진 효과를 내기 위해 덱 자료구조를 활용하면 문제를 쉽게 해결할 수 있다.

현재 뒤집힌 상태인지 아닌지를 나타낼 boolean타입의 변수를 하나 선언하고 뒤집는 명령이 떨어질 때마다 값을 바꿔준다. 해당 변수의 상태에 따라 제거 명령이 떨어지면 덱의 첫 번째 또는 마지막 원소를 제거하도록 한다. 아래 코드의 `operateFunction()`함수를 통해 해당 내용을 확인할 수 있다.

문제의 입력과 출력의 경우 불친절하게 주어져 직접 파싱하고 포맷팅 해줘야한다. 해당 내용은 아래 코드를 참고하자.

## 코드

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.Deque;
import java.util.LinkedList;
import java.util.StringTokenizer;

public class Main{
	private static String operateFunction(String function, Deque<String> deque) {
		boolean isReversed = false;

		int functionLength = function.length();

		for(int i = 0; i < functionLength; i++) {
			if(function.charAt(i) == 'R') {
				isReversed = !isReversed;
				continue;
			}
			if(deque.isEmpty()) {
				return "error";
			}
			if(isReversed) {
				deque.pollLast();
				continue;
			}
			deque.pollFirst();
		}

		StringBuilder sb = new StringBuilder();
		sb.append("[");
		if(!isReversed) {
			while(!deque.isEmpty()) {
				sb.append(deque.poll());
				sb.append(",");
			}
		}else {
			while(!deque.isEmpty()) {
				sb.append(deque.pollLast());
				sb.append(",");
			}
		}
		if(sb.length() != 1) sb.delete(sb.length() - 1, sb.length());
		sb.append("]");
		return sb.toString();
	}

	private static Deque<String> getDeque(String arrayInfo) {
		Deque<String> deque = new LinkedList<String>();

		if(arrayInfo.equals("[]")) return deque;

		String numWithComma = arrayInfo.substring(1, arrayInfo.length() - 1);
		StringTokenizer st = new StringTokenizer(numWithComma, ",");
		while(st.hasMoreTokens()) {
			deque.add(st.nextToken());
		}

		return deque;
	}

	public static void main(String args[]) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int t = Integer.parseInt(br.readLine());
		String[] functions = new String[t];
		ArrayList<Deque<String>> deques = new ArrayList<Deque<String>>();
		for(int i = 0; i < t; i++) {
			functions[i] = br.readLine();
			int n = Integer.parseInt(br.readLine());
			deques.add(getDeque(br.readLine()));
		}

		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		for(int i = 0; i < functions.length; i++) {
			bw.append(operateFunction(functions[i], deques.get(i)));
			bw.append("\n");
		}
		bw.flush();
	}
}
```
