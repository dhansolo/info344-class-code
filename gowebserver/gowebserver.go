package main

import (
	"net/http"
	"fmt"
	"time"
	"encoding/json"
	"log"
	"runtime"
)

//Structure for json. Represents a response from the hello route
type HelloResponse struct {
	Name string `json:"name"`
	Message string `json:"message"`
	GeneratedAt time.Time `json:"generatedAt"`
}

//
var memstats = new(runtime.MemStats)

func getMemStats(w http.ResponseWriter, r *http.Request) {
	runtime.ReadMemStats(memstats)
	allocstats := make(map[string]uint64)
	allocstats["alloc"] = memstats.Alloc
	allocstats["totalAlloc"] = memstats.TotalAlloc
	//Will only care about TotalAlloc values
	j, err := json.Marshal(allocstats)
	if nil != err {
		log.Println(err)
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	} else {
		//Allows us to add a header to the response. Says that we're sending back json
		w.Header().Add("Content-Type", "application/json")
		//Otherwise, write the response
		w.Write(j)
	}
}

func sayHello(w http.ResponseWriter, r *http.Request) {
	//Allows users to put stuff after the last / and will appear on the browser after "Hello"
	name := r.URL.Path[len("/api/v1/hello/"):]
	//JSON structure with values
	resp := HelloResponse{Name: name, Message: "Hello " + name, GeneratedAt: time.Now()}
	//Takes structure and creates json representation of it. Success = nil, Error = err
	//Will only export properties in the struct, therefore anything lowercase is private to the struct
	j, err := json.Marshal(resp)
	if nil != err {
		log.Println(err)
		w.WriteHeader(500)
		w.Write([]byte(err.Error()))
	} else {
		//Allows us to add a header to the response
		w.Header().Add("Content-Type", "application/json")
		//Otherwise, write the response
		w.Write(j)
	}
}

func main() {
	//Server static files
	//Handle expects that the second argument is more complex with more capabilities
	http.Handle("/", http.FileServer(http.Dir("./static")))
	//HandleFunc expects that the second function is a go argument with lower capabilities
	//Anything that comes after the last / will still be directed to /api/v1/hello
	http.HandleFunc("/api/v1/hello/", sayHello)
	//Requests memory statistics for performance purposes
	http.HandleFunc("/api/v1/memstats", getMemStats)
	
	fmt.Println("Server listening on port 9000...")	
	//nil is added to say not to go to the next line after so that the webs server does not halt
	//First argument is a string because we want to listen to a specific port	
	http.ListenAndServe(":9000", nil)
}

//Order does not matter in GO
//The longest url, and therefore more specific, path wins