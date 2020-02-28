---
title: '백준 1193 분수찾기'
date: 2020-01-12 08:26:28 -0400
path: 'codingtest/20200112boj_1193_search_fraction'
---

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int value = sc.nextInt();
		int n = 0;
		int acc = 0;
		while(acc<value) {
			n++;
			acc += n;
		}
		int seq = acc - value;
		if(n%2 == 0) {
			System.out.print((n-seq)+"/"+(seq+1));
		}else {
			System.out.print((seq+1)+"/"+(n-seq));
		}
	}
}
```
