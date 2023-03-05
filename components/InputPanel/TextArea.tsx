import { useEffect, useRef } from "preact/hooks";

const ITERATE=`

[]n
0#iterate {
    // for i in range(n - 1):
    2 <-n . 1 ->n
    <-> . 1 + 1 ->n
    == ! ? {
        // a, b = b, a + b
        // (ba -- bab)
        <^>
        
        // (bab -- (b + a)b)
        + 

        iterate
    }
}


1#fib {
    // if n <= 1:
    . 1 <= . ? { @
        // return n
        .
    1 } ! ? {
        1 - 1 ->n
        // a, b = 0, 1
        0
        1
        
        0 1 ->n
        iterate

        // return b
    }
}

50 . fib

"Fib({3})={1}"

`

const MEMO = `
[]n
[]memo
[]memo_index

// fib(0) = 1
0 1 ->memo_index
0 1 ->memo
// fib(1) = 1
1 1 ->memo_index
1 1 ->memo

// (n,m -- <1|0>n,m)
1#IS_MEMOIZED 
{
  .
  1 <-memo_index
  . 1 ->memo_index
  <=
}

// (n,fib(n),a, -- fib(n),a,n)
2#MEMOIZE
{
 IS_MEMOIZED ! . ? { @ 
  1 ->memo_index
  . 1 ->memo
  1 } ! ? {
    @
  }
}

[]check
[]temp_memo
[]temp_memo_index
// ( ,c,a[] -- n,c,a[])
0#GET_ME {
  1 <-memo
  1 ->temp_memo
  1 <-memo_index
  .
  1 ->temp_memo_index
  1 <-check
  . 1 ->check
  == . ? { @
    1 <-temp_memo
    . 1 ->temp_memo
  1 } ! ? {
    GET_ME
  }
  1 <-temp_memo
  1 ->memo
  1 <-temp_memo_index
  1 ->memo_index
}

// where a[] is [a_x...a_n...a_0]
// (n,a[] -- a_n,a[])
1#GET_MEMO 
{
  1 ->check
  GET_ME
  1 <-check @
}

// (n -- fib(n))
1#FIB 
{
  IS_MEMOIZED . ? { @
    GET_MEMO
  1 } ! ? {
    . 1 ->n
    . 1 - FIB 
    <-> 2 - FIB
    +
    1 <-n
    MEMOIZE
  }
}

55 FIB

`

const FIB = `1#fib
{
  . 1 ->MY_VAR
  . . 1 == <-> 0 == | ! ?
  {
    . 1 - fib
    <-> 2 - fib
    . 1 ->test
    +
  }
}

[]MY_VAR
[]test

5 fib


2
<-MY_VAR`

const TextArea = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  return (
    <textarea class="w-full h-full">
      {ITERATE}
    </textarea>
  );
};

export default TextArea;
