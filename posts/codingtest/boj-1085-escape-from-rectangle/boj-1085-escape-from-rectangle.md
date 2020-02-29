---
title: '[자바]백준 1085 직사각형에서 탈출'
date: 2020-01-20 08:26:28 -0400
path: 'codingtest/20200120boj_1085_escape_from_rectangle'
---

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int x = sc.nextInt();
		int y = sc.nextInt();
		int w = sc.nextInt();
		int h = sc.nextInt();
	 	int min = x;
	 	if(y<min) min = y;
	 	if(w-x<min) min = w-x;
	 	if(h-y<min) min = h-y;
		System.out.print(min);
	}
}
```
