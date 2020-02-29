---
title: '[자바]백준 4153 직각삼각형'
date: 2020-01-22 08:26:28 -0400
path: 'codingtest/20200122boj_4153_right_angled_triangle'
---

```java
import java.util.*;

public class Main {
	static boolean isRightAngle(int a, int b, int c) {
		if(Math.pow(c, 2) == Math.pow(b, 2) + Math.pow(a, 2)) {
			return true;
		}else {
			return false;
		}
	}
	static void printResult (boolean isRightAngle) {
		if(isRightAngle) {
			System.out.println("right");
		}else {
			System.out.println("wrong");
		}
	}
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		while(true) {
			int a = sc.nextInt();
			int b = sc.nextInt();
			int c = sc.nextInt();
			if(a == 0 && b == 0 && c == 0) break;
			if(a > b && a > c) {
				printResult(isRightAngle(b, c, a));
			}else if(b > a && b > c) {
				printResult(isRightAngle(a, c, b));
			}else if (c > a && c > b) {
				printResult(isRightAngle(a, b, c));
			}
		}
	}
}
```
