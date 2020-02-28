---
title: '백준 2839 설탕배달'
date: 2020-01-11 08:26:28 -0400
path: 'codingtest/20200111boj_2839_sugar_delivery'
---

```java
import java.util.*;

public class Main {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		int kg = sc.nextInt();
		int totalNum = 0;
		int fiveKgNum = kg/5;
		while((kg-5*fiveKgNum)%3!=0) {
			fiveKgNum--;
			if(fiveKgNum<0) {
				totalNum = -1;
				break;
			}
		}
		if(totalNum!=-1)totalNum = fiveKgNum + (kg-5*fiveKgNum)/3;
		System.out.print(totalNum);
	}
}
```
