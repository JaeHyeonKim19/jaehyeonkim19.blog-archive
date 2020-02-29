---
title: '[자바]백준 2133 타일채우기'
date: 2020-02-16 08:26:28 -0400
path: 'codingtest/20200216boj_2133_fill_tiles'
---

```java
import java.io.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int [] dp = new int[n + 1];
		if(n == 1) {
			System.out.print(0);
			return;
		}
		if(n == 2) {
			System.out.println(3);
			return;
		}
		dp[0] = 1;
		dp[2] = 3;
		for(int i = 4; i <= n; i++) {
			if(i % 2 == 1) continue;
			dp[i] += dp[i - 2] * 3;
			for(int j = 0; j < i - 3; j++) {
				dp[i] += dp[j] * 2;
			}
		}
		System.out.print(dp[n]);
	}
}
```
