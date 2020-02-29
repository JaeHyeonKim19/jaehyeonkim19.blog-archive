---
title: '[자바]백준 2447 별 찍기'
date: 2020-01-27 08:26:28 -0400
path: 'codingtest/20200127boj_2447_print_star'
---

```java
import java.io.*;
import java.util.Arrays;

public class Main {
	static char [][] stars;
	static void isStar(int x, int y, int n) {
		int m = n / 3;
		if(n == 1) {
			stars[x][y] = '*';
		} else {
			for(int i = 0;i < 3;i++) {
				for(int j = 0;j < 3;j++) {
					if(i == 1 && j == 1) continue;
					isStar(m * i + x, m * j + y, m);
				}
			}
		}
	};
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		stars = new char[n][n];
		for(int i = 0;i < stars.length;i++) {
			Arrays.fill(stars[i], ' ');
		}
		isStar(0, 0, n);
		for(int i = 0;i < n;i++) {
			System.out.println(stars[i]);
		}
	}
}
```
