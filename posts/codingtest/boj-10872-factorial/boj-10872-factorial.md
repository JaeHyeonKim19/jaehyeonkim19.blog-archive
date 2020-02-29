---
title: '[자바]백준 10872 팩토리얼'
date: 2020-01-25 08:26:28 -0400
path: 'codingtest/20200125boj_10872_factorial'
---

```java
import java.io.*;

public class Main {
	static int factorial(int n) {
		if (n <= 1) return 1;
		return n * factorial(n-1);
	}
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		System.out.println(factorial(n));
	}
}
```
