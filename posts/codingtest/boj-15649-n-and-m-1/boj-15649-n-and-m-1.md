---
title: '[자바]백준 15649 N과 M'
date: 2020-01-23 08:26:28 -0400
path: 'codingtest/20200123boj_15649_n_and_m_1'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
	static int [] arr;
	static boolean [] isVisited;
	static void dfs(int n, int m, int d) throws IOException{
		if(d == m) {
			for(int e : arr) {
				bw.write(e + " ");
			}
			bw.write("\n");
			return;
		}
		for(int i = 1;i <= n;i++) {
			if(!isVisited[i]) {
				isVisited[i] = true;
				arr[d] = i;
				dfs(n, m, d+1);
				isVisited[i] = false;
			}
		}
	}
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		arr = new int [m];
		isVisited = new boolean [n+1];
		dfs(n, m, 0);
		bw.flush();
	}
}
```
