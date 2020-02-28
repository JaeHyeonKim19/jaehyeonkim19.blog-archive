---
title: '백준 2908 상수'
date: 2020-01-10 08:26:28 -0400
path: 'codingtest/20200110sangsu'
---

```java
import java.util.*;

public class Main {
	static int getReverseNum(String str) {
		String[] strs = str.split("");
		String temp = strs[0];
		strs[0] = strs[2];
		strs[2] = temp;
		strs[0] += strs[1] + strs[2];
		int result = Integer.parseInt(strs[0]);
		return result;
	}
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int num1 = getReverseNum(sc.next());
		int num2 = getReverseNum(sc.next());
		if(num1>num2) {
			System.out.print(num1);
		} else {
			System.out.print(num2);
		}
	}
}
```
