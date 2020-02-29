---
title: '[자바]백준 5585 거스름돈'
date: 2020-02-11 08:26:28 -0400
path: 'codingtest/20200211boj_5585_change'
---

```java
import java.io.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int change = 1000 - Integer.parseInt(br.readLine());
		int [] changes = {500, 100, 50, 10, 5, 1};
		int answer = 0;
		for(int i = 0; i < changes.length; i++) {
			if(change / changes[i] > 0) {
				answer += (change / changes[i]);
				change %= changes[i];
			}
		}
		System.out.print(answer);
	}
}
```
