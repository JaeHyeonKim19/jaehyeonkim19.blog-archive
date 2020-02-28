---
title: '백준 11720 숫자의 합'
date: 2020-01-08 08:26:28 -0400
path: 'codingtest/20200108sum_of_num'
---

```java
import java.math.BigInteger;
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int count = sc.nextInt();
		int acc = 0;
		String num = sc.next();
		for(int i=0;i<num.length();i++) {
			acc = acc + Character.getNumericValue(num.charAt(i));
		}
		System.out.print(acc);
	}
}
```
