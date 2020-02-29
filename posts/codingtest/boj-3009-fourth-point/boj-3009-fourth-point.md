---
title: '[자바]백준 3009 네번째 점'
date: 2020-01-21 08:26:28 -0400
path: 'codingtest/20200121boj_3009_fourth_point'
---

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int x1 = sc.nextInt();
		int y1 = sc.nextInt();
		int x2 = sc.nextInt();
		int y2 = sc.nextInt();
		int x3 = sc.nextInt();
		int y3 = sc.nextInt();
		int x4 = 0;
		int y4 = 0;
		if(x1 == x2) {
			x4 = x3;
		}else if(x2 == x3) {
			x4 = x1;
		}else if(x3 == x1) {
			x4 = x2;
		}
		if(y1 == y2) {
			y4 = y3;
		}else if(y2 == y3) {
			y4 = y1;
		}else if(y3 == y1) {
			y4 = y2;
		}
		System.out.println(x4 + " " + y4);
	}
}
```
