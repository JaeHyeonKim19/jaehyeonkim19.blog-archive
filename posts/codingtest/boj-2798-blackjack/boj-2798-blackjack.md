---
title: '[자바]백준 2798 블랙잭'
date: 2020-02-10 08:26:28 -0400
path: 'codingtest/20200210boj_2798_blackjack'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		int m = Integer.parseInt(st.nextToken());
		int answer = 0;
		int sum = 0;
		int [] nums = new int[n];
		st = new StringTokenizer(br.readLine());
		for(int i = 0; i < n; i++) {
			nums[i] = Integer.parseInt(st.nextToken());
		}

		for(int i = 0; i < n; i++) {
			for(int j = 0; j < n; j++) {
				if(i == j) continue;
				for(int k = 0; k < n; k ++) {
					if(i == k || j == k) continue;
					sum = nums[i] + nums[j] + nums[k];
					if(sum <= m && sum > answer) answer = sum;
				}
			}
		}
		System.out.print(answer);
	}
}
```
