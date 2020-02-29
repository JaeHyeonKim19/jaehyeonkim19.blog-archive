---
title: '[자바]백준 11726 2*n 타일링'
date: 2020-02-10 08:26:28 -0400
path: 'codingtest/20200210boj_11726_fill_tile'
---

```java
import java.io.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int [] arr = new int[n + 1];
		arr[1] = 1;
		if(n >= 2) arr[2] = 2;
		for(int i = 3; i < arr.length; i++) {
			arr[i] = arr[i - 1] % 10007 + arr[i - 2] % 10007;
		}
		System.out.print(arr[n] % 10007);
	}
}


```
