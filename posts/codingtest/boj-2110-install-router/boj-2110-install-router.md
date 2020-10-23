---
title: '[자바]백준 2110 공유기 설치'
date: 2020-10-23 09:00:00 +0900
path: codingtest/20201023boj-2110-install-router'
---

## 문제

[백준 2110번 공유기 설치](https://www.acmicpc.net/problem/2110)

## 풀이

가장 인접한 두 공유기 사이의 거리가 최대값을 가지도록 주어진 갯수만큼 공유기를 설치하는 문제다.

임의의 거리 값을 지정해서 공유기를 설치한 후 설치된 공유기 갯수와 주어진 공유기 갯수를 비교한다. 공유기가 주어진 공유기 갯수보다 더 많이 필요하면 거리를 증가시켜주고 공유기가 주어진 공유기 갯수보다 적으면 거리를 감소시켜준다.

거리를 바꿔줄 때 특별한 규칙 없이 순차적으로 바꿔주게 되면 최악의 경우 복잡도가 200,000(집의 최대 갯수) * 999,999,999(확인해봐야하는 거리의 범위)가 되어 문제를 해결 할 수 없다. 따라서 거리를 찾을 때 이분탐색을 활용해서 찾아주도록하자(복잡도가 O(nm)에서 O(nlogm)으로 감소).

여기서 유의할 점은 주어진 갯수를 충족하는 거리가 여러개 있을 수 있다는 점이다. 따라서 upper bound를 활용하여 주어진 갯수를 충족하는 거리 중 제일 큰 값을 찾아주자. upper bound는 주어진 값보다 큰 첫 번째 위치(초과)를 찾아주기 때문에 upper bound로 거리를 찾아준 후 - 1을 해주면 원하는 값을 얻을 수 있다.

자세한 풀이는 아래 코드를 참고하자.

## 코드

```java
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main{
	public static void main(String args[]) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		StringTokenizer st = new StringTokenizer(br.readLine());
		int n = Integer.parseInt(st.nextToken());
		int c = Integer.parseInt(st.nextToken());
		int[] houseLocations = new int[n];
		for(int i = 0; i < n; i++) {
			houseLocations[i] = Integer.parseInt(br.readLine());
		}
		
		Arrays.sort(houseLocations);
		
		int minDistance =  1;
		int maxDistance = houseLocations[houseLocations.length - 1];
		int distance = (minDistance + maxDistance) / 2;
		int count;
		int priorLocation;
		
		while(minDistance < maxDistance) {
			count = 1;
			priorLocation = 0;
			
			for(int i = 1; i < houseLocations.length; i++) {
				if(houseLocations[i] - houseLocations[priorLocation] >= distance) {
					priorLocation = i;
					count++;
				}
			}
			
			if(count >= c) {
				minDistance = distance + 1;
			}else if(count < c) {
				maxDistance = distance;
			}
			
			distance = (minDistance + maxDistance) / 2;
		}
		
		System.out.print(distance - 1);
	}
}
```
