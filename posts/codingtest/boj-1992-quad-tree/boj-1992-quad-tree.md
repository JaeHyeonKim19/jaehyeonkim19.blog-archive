---
title: '[자바]백준 1992 쿼드트리'
date: 2020-10-16 09:00:00 +0900
path: codingtest/20201016boj-1992-quad-tree'
---

## 문제

[백준 1992 쿼드트리](https://www.acmicpc.net/problem/1992)

## 풀이

분할정복 문제이다. 주어진 영상이 단색으로 이루어져 있는지 확인하고 그렇지 않다면 문제의 주어진 조건대로 정사각형 4조각으로 나눠가며 같은 색으로 이루어진 조각이 될 때까지 압축하면 된다.

## 코드

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main{
	private static char[][] image;
	private static StringBuilder answer;
	
	
	private static void compress(int range, int x, int y) {
		boolean canCompress = true;
		char standard = image[x][y];
		for(int i = 0; i < range; i++) {
			for(int j = 0; j < range; j++) {
				if(image[x + i][y + j] != standard) {
					canCompress = false;
					break;
				}
			}
			if(!canCompress) break;
		}
		
		if(canCompress) {
			answer.append(standard);
			return;
		}
		
		answer.append("(");
		compress(range / 2, x, y);
		compress(range / 2, x, y + range / 2);
		compress(range / 2, x + range / 2, y);
		compress(range / 2, x + range / 2, y + range / 2);
		answer.append(")");
	}
	
	public static void main(String args[]) throws IOException {
		answer = new StringBuilder();
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		image = new char[n][n];
		for(int i = 0; i < n; i++) {
			String row = br.readLine();
			for(int j = 0; j < n; j++) {
				image[i][j] = row.charAt(j);
			}
		}
		
		compress(n, 0, 0);
		
		System.out.print(answer.toString());
	}
}
```