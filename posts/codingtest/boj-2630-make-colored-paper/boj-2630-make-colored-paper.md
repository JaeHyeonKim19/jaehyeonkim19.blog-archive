---
title: '[자바]백준 2630 색종이 만들기'
date: 2020-10-16 09:00:00 +0900
path: codingtest/20201016boj-2630-make-colored-paper'
---

## 문제

[백준 2630 색종이 만들기](https://www.acmicpc.net/problem/2630)

## 풀이

브루트포스, 분할정복 문제이다. 종이의 색깔이 하나로 칠해져있는지 검사하고 그렇지 않다면 문제의 조건에 따라 구역을 나눠가며 재귀적으로 검사하면 된다.

## 코드

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.StringTokenizer;

public class Main{
	private static int[][] paper;
	private static int bluePaper = 0;
	private static int whitePaper = 0;
	private static final int WHITE = 0;
	private static final int BLUE = 1;
	private static final int[][] coordinates = {{0, 0}, {1, 0}, {0, 1}, {1, 1}};
	
	private static boolean isOneColor(int x, int y, int n) {
		int standardColor = paper[x][y];
		for(int i = x; i < x + n; i++) {
			for(int j = y; j < y + n; j++) {
				if(standardColor != paper[i][j]) return false;
			}
		}
		return true;
	}
	
	private static void checkAndCutPaper(int x, int y, int n) {
		if (isOneColor(x, y, n)) {
			if(paper[x][y] == BLUE) {
				bluePaper++;
				return;
			}
			whitePaper++;
			return;
		}
		
		int nextN = n / 2;
		for(int i = 0; i < coordinates.length; i++) {
			checkAndCutPaper(x + coordinates[i][0] * nextN, y + coordinates[i][1] * nextN, nextN);
		}
	}
	
	public static void main(String args[]) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		paper = new int[n][n];
		StringTokenizer st;
		for(int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j = 0; j < n; j++) {
				paper[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		
		checkAndCutPaper(0, 0, n);
		
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		bw.append(whitePaper + "\n" + bluePaper);
		bw.flush();
	}
}
```