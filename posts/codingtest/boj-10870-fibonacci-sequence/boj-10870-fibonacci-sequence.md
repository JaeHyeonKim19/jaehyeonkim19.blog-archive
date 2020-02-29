---
title: '[자바]백준 10870 피보나치의 수열'
date: 2020-01-26 08:26:28 -0400
path: 'codingtest/20200126boj_10870_fibonacci_sequence'
---

```java
import java.io.*;

public class Main {
	static int fibonacci(int n) {
		if(n == 0) return 0;
		if(n == 1) return 1;
		return fibonacci(n - 1) + fibonacci(n - 2);
	}
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		System.out.println(fibonacci(Integer.parseInt(br.readLine())));
	}
}
```
