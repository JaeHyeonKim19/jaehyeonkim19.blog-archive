---
title: '[자바]백준 11053 가장 긴 증가하는 부분 수열'
date: 2020-10-21 09:00:00 +0900
path: 'codingtest/20201021boj-11053-longest-increasing-subsequence'
---

## 문제

[가장 긴 증가하는 부분 수열](https://www.acmicpc.net/problem/11053)

## 풀이

가장 긴 증가하는 부분 수열(LIS; Longest Increasing Subsequence)의 길이를 구하는 문제다.

먼저 단순하게 완전탐색으로 생각해보자. 최악의 경우 모든 배열 요소들에대해 선택하는 경우, 선택하지 않는 경우를 모두 확인해야한다. 이 경우 복잡도(빅오 표기법)는 2의 n제곱이 된다. 문제 조건에서 n은 1000까지 가능하므로 2의 1000제곱이라는 무지막지한 수가 나오기 때문에 이 방법은 사용할 수 없다.

다음은 DP를 활용하는 첫 번째 방법이다. 주어진 수열과 길이가 같은 배열을 하나 더 만든다. 해당 배열에는 n번째 수를 마지막 원소로 가지는 LIS의 길이를 채워나간다. 채워나가는 규칙은 1 ~ n - 1번째 숫자 중 n번째 숫자보다 작은 숫자들이 가진 길이 값을 비교한다. 비교한 길이 값중 가장 긴 값 + 1을 구하면 이 값이 n번째 수를 마지막 원소로 가지는 LIS의 길이 값이 된다. 코드는 아래 풀이1의 `getLISLength()`메소드의 코드를 확인하면 된다. 이 경우 복잡도(빅오 표기법)는 n의 제곱이 된다. 여기서 n의 값은 최대 1,000이므로 최악의 경우 복잡도는 1,000,000으로 충분히 실행 가능한 값을 가진다. 따라서 해당코드로도 주어진 문제를 해결할 수 있다.

하지만 n이 100,000 정도가 되면 최악의 경우 복잡도가 10,000,000,000이 되어 해당 방법으로는 문제를 해결할 수가 없다. 따라서 n의 최대값이 100,000을 넘을 경우 우리는 복잡도를 nlogn으로 낮춰야한다. 어떤 방법으로 복잡도를 낮출 수 있을까?

DP와 이분탐색(lower bound)를 사용하면 해당 문제를 nlogn의 복잡도로 해결할 수 있다. 수열을 처음부터 차례대로 확인하며 적절한 위치에 삽입해주면 된다. 여기서 적절한 위치를 찾을때 lower bound를 활용하면 된다. 적절한 위치를 찾는 법은 간단하다. ArrayList를 하나 만들고 수열에 있는 값을 하나씩 삽입해 줄 것이다. 현재 숫자가 ArrayList에 있는 숫자의 최대값보다 크면 그냥 맨 뒤에 add해준다. 그렇지 않다면 lower bound를 활용하여 현재 숫자와 값이 같거나 큰 숫자 중 최솟값의 위치를 찾아서 replace해주면 된다.(list의 set()메소드를 활용하자) 해당 코드는 풀이2를 통해서 확인할 수 있다.

## 코드

### 풀이 1

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;
import java.io.IOException;

public class Main{
	public static int getLISLength(int[] array) {
		int[] lengthInfos = new int[array.length];
		lengthInfos[0] = 1;
		for(int i = 1; i < array.length; i++) {
			lengthInfos[i] = 1;
			for(int j = i - 1; j >= 0; j--) {
				if(array[i] > array[j]) {
					if(lengthInfos[i] < lengthInfos[j] + 1) {
						lengthInfos[i] = lengthInfos[j] + 1;
					}
				}
			}
		}

		int answer = 1;
		for(int i = 0; i < lengthInfos.length; i++) {
			if(lengthInfos[i] > answer) {
				answer = lengthInfos[i];
			}
		}

		return answer;
	}

	public static void main(String args[]) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int[] numberArray = new int[n];
		StringTokenizer st = new StringTokenizer(br.readLine());
		for(int i = 0; i < n; i++) {
			numberArray[i] = Integer.parseInt(st.nextToken());
		}

		int answer = getLISLength(numberArray);

		System.out.print(answer);
	}
}
```

### 풀이2

```java
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;
import java.io.IOException;

public class Main{
	public static int getLowerBoundIndex(ArrayList<Integer> list, int value) {
		int low = 0;
		int high = list.size();
		int mid = list.size() / 2;
		while(low < high) {
			if(list.get(mid) > value) {
				high = mid;
				mid = (high + low) / 2;
			}else if(list.get(mid) < value) {
				low = mid + 1;
				mid = (high + low) / 2;
			}else {
				return mid;
			}
		}
		return mid;
	}

	public static void main(String args[]) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		int n = Integer.parseInt(br.readLine());
		int[] numberArray = new int[n];
		StringTokenizer st = new StringTokenizer(br.readLine());
		for(int i = 0; i < n; i++) {
			numberArray[i] = Integer.parseInt(st.nextToken());
		}

		ArrayList<Integer> tempNumberList = new ArrayList<Integer>();

		for(int i = 0; i < numberArray.length; i++) {
			int lowerBoundIndex = getLowerBoundIndex(tempNumberList, numberArray[i]);
			if(lowerBoundIndex < tempNumberList.size()) {
				tempNumberList.set(lowerBoundIndex, numberArray[i]);
				continue;
			}
			tempNumberList.add(numberArray[i]);
		}

		System.out.print(tempNumberList.size());

	}
}
```
