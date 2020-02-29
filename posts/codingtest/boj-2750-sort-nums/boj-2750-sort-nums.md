---
title: '[자바]백준 2750 수 정렬하기'
date: 2020-02-06 08:26:28 -0400
path: 'codingtest/20200206boj_2750_sort_nums'
---

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int n = Integer.parseInt(br.readLine());
		int [] arr = new int[n];
		for(int i = 0; i < n; i++) {
			arr[i] = Integer.parseInt(br.readLine());
		}
		Arrays.sort(arr);
		for(int i = 0; i < n; i++) {
			bw.append(arr[i] + "\n");
		}
		bw.flush();
	}
}
```
