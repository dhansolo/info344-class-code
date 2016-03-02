package main

import (
	"fmt"
	"net/http"
	"time"
	"sync"
)

type MyStruct struct {
	value int
	//Mutually exclusive lock (only one thread wil be able to work with this structure at a time)
	//RW allows only one writer at a time
	mx sync.RWMutex
}

func (m *MyStruct) SetValue(val int) {
	m.mx.Lock()
	m.value = val
	m.mx.Unlock()
}

func (m *MyStruct) GetValue() int {
	m.mx.RLock()
	defer m.mx.RUnlock()
	return m.value
}

var _mystruct MyStruct

func loadMyStruct() {
	//Simulate a long loading process
	time.Sleep(5 * time.Second)
	_mystruct.SetValue(5)
}

func getValue(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte(fmt.Sprintf("value is %d", _mystruct.GetValue())))
}

func main() {
	go loadMyStruct()
	
	http.HandleFunc("/", getValue)
	http.ListenAndServe(":9000", nil)
}