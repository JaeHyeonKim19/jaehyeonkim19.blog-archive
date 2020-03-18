---
title: '[자바]백준 1436 영화감독 숌'
date: 2020-03-18 09:00:00 +0900
path: 'codingtest/20200318boj_1436_movie_director_shom'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int num = 666;
		int count = 0;
		while(count < n) {
			String numStr = Integer.toString(num);
			if(numStr.contains("666")) count++;
			num++;
		}
		System.out.print(num - 1);
	}
}
```
