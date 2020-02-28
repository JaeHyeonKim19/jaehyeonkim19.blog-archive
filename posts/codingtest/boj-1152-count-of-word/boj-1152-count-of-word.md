---
title: '백준 1152 단어의 개수'
date: 2020-01-10 08:26:28 -0400
path: 'codingtest/20200110boj_1152_count_of_word'
---

```java
import java.util.*;

public class Main {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		String str = sc.nextLine();
		int count = 1;
		for(int i = 1;i<str.length()-1;i++) {
			if(str.charAt(i)==' ') count++;
		}
		if(str.length()==1 && count ==1) {
			count = str.charAt(0)==' ' ? 0 : 1;
		}
		System.out.print(count);
	}
}
```
