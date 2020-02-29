---
title: '[자바]백준 11403 경로 찾기'
date: 2020-02-10 08:26:28 -0400
path: 'codingtest/20200210boj_11403_find_route'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int n = Integer.parseInt(br.readLine());
		int [][] roads = new int[n][n];
		StringTokenizer st = new StringTokenizer("");
		for(int i = 0; i < n; i++) {
			st = new StringTokenizer(br.readLine());
			for(int j = 0; j < n; j++) {
				roads[i][j] = Integer.parseInt(st.nextToken());
			}
		}
		for(int i = 0; i < n; i++) {
			for(int j = 0; j < n; j++) {
				for(int k = 0; k < n; k++) {
					if(roads[j][i] == 1 && roads[i][k] == 1) roads[j][k] = 1;
				}
			}
		}
		for(int i = 0; i < n; i++) {
			for(int j = 0; j < n ; j++) {
				bw.write(roads[i][j] + " ");
			}
			bw.write("\n");
		}
		bw.flush();
	}
}
```
