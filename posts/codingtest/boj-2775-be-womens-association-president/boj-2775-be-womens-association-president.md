---
title: '백준 2775 부녀회장이 될테야'
date: 2020-01-13 08:26:28 -0400
path: 'codingtest/20200113boj_2775_be_womens_association_president'
---

```java
import java.util.*;

public class Main {
	static int getPeopleNum(int k, int n) {
		int num = 0;
		if(k == 0) {
			num = n;
		}else {
			for(int i = 1;i<=n;i++) {
				num += getPeopleNum(k-1, i);
			}
		}
		return num;
	}

	public static void main(String[] args) {

		Scanner sc = new Scanner(System.in);
		int num = sc.nextInt();
		int k = 0;
		int n = 0;
		for(int i = 0;i<num;i++) {
			k = sc.nextInt();
			n = sc.nextInt();
			System.out.println(getPeopleNum(k, n));
		}
	}
}
```
