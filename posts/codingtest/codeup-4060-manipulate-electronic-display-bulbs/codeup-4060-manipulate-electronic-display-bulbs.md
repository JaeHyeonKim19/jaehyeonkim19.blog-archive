---
title: '[자바]코드업 4060 전광판 전구 조작'
date: 2020-03-08 09:00:00 +0900
path: 'codingtest/20200308codeup_4060_manipulate_electronic_display_bulbs'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	static int [][] coordinate = {{1, -2, 1, 0}, {0, 0, 1, -2}};
	static int m;
	static int n;

	static void rec(int [][] bulbs, int x, int y, int targetBulb) {
		bulbs[x][y] = targetBulb == 0 ? 1 : 0;
		int nextX = x;
		int nextY = y;
		for(int i = 0; i < 4; i++) {
			nextX += coordinate[0][i];
			nextY += coordinate[1][i];
			if(nextX < 0 || nextY < 0 || nextX >= m || nextY >= n) continue;
			if (bulbs[nextX][nextY] == targetBulb) rec(bulbs, nextX, nextY, targetBulb);
		}
	}

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		m = Integer.parseInt(st.nextToken());
		n = Integer.parseInt(st.nextToken());
		int [][] bulbs1 = new int[m][n];
		int [][] bulbs2 = new int[m][n];
		int count = 0;
		for(int i = 0; i < m; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j = 0; j < n; j++) {
				bulbs1[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		for(int i = 0; i < m; i++) {
			for(int j = 0; j < n; j++) {
				bulbs2[i][j] = bulbs1[i][j];
			}
		}
		for(int i = 0; i < m; i++) {
			for(int j = 0; j < n; j++) {
				if(bulbs1[i][j] == 0) {
					count ++;
					rec(bulbs1, i, j, 0);
				}
			}
		}
		System.out.print(count + " ");
		count = 0;
		for(int i = 0; i < m; i++) {
			for(int j = 0; j < n; j++) {
				if(bulbs2[i][j] == 1) {
					count ++;
					rec(bulbs2, i, j, 1);
				}
			}
		}
		System.out.print(count);
	}
}
```
