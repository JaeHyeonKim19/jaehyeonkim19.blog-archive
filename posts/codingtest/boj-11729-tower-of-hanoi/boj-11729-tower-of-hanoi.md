---
title: '[자바]백준 11729 하노이 탑 이동 순서'
date: 2020-01-28 08:26:28 -0400
path: 'codingtest/20200128boj_11729_tower_of_hanoi'
---

```java
import java.io.*;

public class Main {
	static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
	static void moveDisk (int a, int b, int n) throws IOException {
		if(n == 1) {
			bw.write(a + " " + b + "\n");
			return;
		}
		moveDisk(a, 6-a-b, n-1);
		bw.write(a + " " + b + "\n");
		moveDisk(6-a-b, b, n-1);
	}
	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		System.out.printf("%.0f%n", Math.pow(2, n)-1);
		moveDisk(1, 3, n);
		bw.flush();
	}
}
```
