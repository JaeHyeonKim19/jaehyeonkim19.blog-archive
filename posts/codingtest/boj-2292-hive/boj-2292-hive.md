---
title: '백준 2292 벌집'
date: 2020-01-11 08:26:28 -0400
path: 'codingtest/20200111boj_2292_hive'
---

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int num = sc.nextInt();
		int index = 1;
		int currentVal = 1;
		while(currentVal<num) {
			index++;
			currentVal += (index-1) * 6;
		}
		System.out.print(index);
	}
}
```
