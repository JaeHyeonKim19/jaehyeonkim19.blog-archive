---
title: '[자바]백준 2751 수 정렬하기2'
date: 2020-02-06 08:26:28 -0400
path: 'codingtest/20200206boj_2751_sort_nums_2'
---

Java에서 Arrays.sort에 primitive type array를 전달하면 dual-pivot quicksort를 수행하기 때문에 최악의 경우 O(N^2)이 됩니다. 이는 보통의 방법으로는 웬만해서는 O(N^2)이 안 되지만 이 문제에는 https://www.acmicpc.net/board/view/34491 에 의해 추가된 저격 데이터가 있습니다. Collections.sort를 사용하는 편이 좋습니다.

```java
import java.io.*;
import java.util.*;

public class Main {
	public static void main(String[] args) throws IOException{
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
		int n = Integer.parseInt(br.readLine());
		ArrayList<Integer> arr = new ArrayList<Integer>();
		for(int i = 0; i < n; i++) {
			arr.add(Integer.parseInt(br.readLine()));
		}
		Collections.sort(arr);
		for(int i = 0; i < n; i++) {
			bw.append(arr.get(i) + "\n");
		}
		bw.flush();
	}
}
```
