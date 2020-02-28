---
title: '백준 1712 손익분기점'
date: 2020-01-11 08:26:28 -0400
path: 'codingtest/20200111boj_1712_break_even_point'
---

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int a = sc.nextInt();
		int b = sc.nextInt();
		int c = sc.nextInt();
		int count = 0;
		if(!(c-b>0)) {
			count = -1;
		}else {
			while(a-count*(c-b)>=0) {
				count++;
			}
		}
		System.out.print(count);
	}
}
```
