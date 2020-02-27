---
title: '프로그래머스 더 맵게'
date: 2019-12-27 08:26:28 -0400
path: 'codingtest/20191227programmers_hotter'
---

> 자체풀이

```java
import java.util.*;
class Solution {
    public int solution(int[] scoville, int K) {
        int answer = 0;
        ArrayList<Integer> scovilleList = new ArrayList<Integer>();

        for(int scovilleItem:scoville){
            scovilleList.add(scovilleItem);
        }
        int criteria = scovilleList.get(0);
        while(criteria<K && scovilleList.size()>1){
            answer++;
            int easiestOne = scovilleList.remove(0);
            int secondaryOne = scovilleList.remove(0);
            int newOne = easiestOne + secondaryOne*2;
            scovilleList.add(0, newOne);
            for(int i = 1;i<scovilleList.size();i++){
                if(scovilleList.get(i-1)>scovilleList.get(i)){
                    int temp = scovilleList.remove(i);
                    scovilleList.add(i-1, temp);
                }else{
                    break;
                }
            }
            criteria = scovilleList.get(0);
        }

        if(scovilleList.size()==1 && criteria<K){
            return -1;
        }
        return answer;
    }
}
```

- 결과
  - 정확성: 2, 3, 7, 10, 15 실패
  - 효율성: 전체 실패

> 자체풀이2(다 합쳐도 K를 넘을 수 없는 경우 추가)

```java
import java.util.*;
class Solution {
    public int solution(int[] scoville, int K) {
        int answer = 0;
        ArrayList<Integer> scovilleList = new ArrayList<Integer>();

        for(int scovilleItem:scoville){
            scovilleList.add(scovilleItem);
        }
        scovilleList.sort(null);
        int criteria = scovilleList.get(0);
        while(criteria<K && scovilleList.size()>1){
            answer++;
            int easiestOne = scovilleList.remove(0);
            int secondaryOne = scovilleList.remove(0);
            int newOne = easiestOne + secondaryOne*2;
            scovilleList.add(0, newOne);
            for(int i = 1;i<scovilleList.size();i++){
                if(scovilleList.get(i-1)>scovilleList.get(i)){
                    int temp = scovilleList.remove(i);
                    scovilleList.add(i-1, temp);
                }else{
                    break;
                }
            }
            criteria = scovilleList.get(0);
        }

        if(scovilleList.size()==1 && criteria<K){
            return -1;
        }
        return answer;
    }
}
```

- 결과
  - 정확성: 전체 통과
  - 효율성: 전체 실패

> min Heap의 일부를 직접 구현

```java
class Solution {
    int [] orderedScoville;
    int currentIndex = -1;

    void offer(int newVal){
        currentIndex++;
        orderedScoville[currentIndex] = newVal;
        int temp = currentIndex;
        while(temp!=0){
            if(orderedScoville[temp]<orderedScoville[(temp+1)/2-1]){
                int changingTemp = orderedScoville[(temp+1)/2-1];
                orderedScoville[(temp+1)/2-1] = orderedScoville[temp];
                orderedScoville[temp] = changingTemp;
                temp = (temp+1)/2-1;
            }else{
                break;
            }
        }
    }

    int poll(){
        int returnValue = orderedScoville[0];
        orderedScoville[0] = orderedScoville[currentIndex];
        orderedScoville[currentIndex] = 0;
        currentIndex--;
        int temp = 0;
        while(true){
        	int smallChildIndex = 0;
        	int firstChildIndex = (temp+1)*2-1;
        	int secondChildIndex = (temp+1)*2;
        	if(firstChildIndex<=currentIndex && secondChildIndex<=currentIndex) {
            	smallChildIndex = orderedScoville[firstChildIndex]>orderedScoville[secondChildIndex]?secondChildIndex:firstChildIndex;
            }else if(firstChildIndex<=currentIndex && secondChildIndex>currentIndex) {
            	smallChildIndex = firstChildIndex;
            }else {
            	break;
            }
            if(orderedScoville[temp]>orderedScoville[smallChildIndex]){
                int changingTemp = orderedScoville[smallChildIndex];
                orderedScoville[smallChildIndex] = orderedScoville[temp];
                orderedScoville[temp] = changingTemp;
                temp = smallChildIndex;
            }else{
                break;
            }
        }
        return returnValue;
    }

    public int solution(int[] scoville, int K) {
        int answer = 0;
        orderedScoville = new int[scoville.length];
        for(int i = 0;i<scoville.length;i++)
            offer(scoville[i]);
        while(orderedScoville[0]<K && currentIndex>0){
            answer++;
            offer(poll()+poll()*2);
        }
        if(currentIndex==0&&orderedScoville[0]<K)
            return -1;
        return answer;
    }
}
```

- 결과
  - 정확성: 전체 통과
  - 효율성: 전체 통과

> min Heap을 응용하여 구현된 우선순위 큐를 활용한 풀이

```java
import java.util.*;
class Solution {
    public int solution(int[] scoville, int K) {
        int answer = 0;
        PriorityQueue<Integer> scovillePriorityQueue = new PriorityQueue<Integer>();
        for(int scovilleValue:scoville)
            scovillePriorityQueue.offer(scovilleValue);
        while(scovillePriorityQueue.peek()<K && scovillePriorityQueue.size()>1){
            answer++;
            scovillePriorityQueue.offer(scovillePriorityQueue.poll()+scovillePriorityQueue.poll()*2);
        }
        if(scovillePriorityQueue.size()==1 && scovillePriorityQueue.peek()<K)
            return -1;
        return answer;
    }
}
```

- 결과
  - 정확성: 전체 통과
  - 효율성: 전체 통과
