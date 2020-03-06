---
title: '[자바]코드업 3515 사탕 줍기 2'
date: 2020-03-06 09:00:00 +0900
path: 'codingtest/20200306codeup_3315_pick_up_candy_2'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	static int n;
	static int [][] candies;
	static boolean [] isVisited;
	static int max;

	static void rec(int x, int y, int candyNum) {
		candyNum += candies[x][y];
		isVisited[x] = true;
		for(int i = 0; i < n; i++) {
			if(!isVisited[i]) {
				rec(i, y + 1, candyNum);
			}
		}
		isVisited[x] = false;
		if (y == n - 1) max = candyNum > max ? candyNum : max;
	}

	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		n = Integer.parseInt(br.readLine());
		candies = new int[n][n];
		isVisited = new boolean [n];
		max = 0;
		StringTokenizer st = new StringTokenizer("");
		for(int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j = 0; j < n; j++) {
				candies[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		for(int i = 0; i < n; i++) {
			rec(i, 0, 0);
		}
		System.out.print(max);
	}
}
```
