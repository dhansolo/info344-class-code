Hey this is some content above the code
<<<<<<< HEAD
<?php 
$name = 'Han';
$fullName = $name . 'Solo';

class Person {
	protected $name;
	
	public function __construct($n) {
		$this->name = $n; 
	}
	
	public function getName() {
		return $this->name;
	}
}

function foo($bar) {
	echo "Hey this is the foo fighting function\n";
=======
<?php
$name = 'Dave';
$fullName = $name . 'Stearns';

class Person {
    protected $name;
    
    public function __construct($n) {
        $this->name = $n;
    }
    
    public function getName() {
        return $this->name;
    }
}

function foo($bar) {
    echo "Hey this is the foo fighting function\n";
>>>>>>> 3c8515c4416a5c067735897bd2477625ce122fd5
}

echo "Hello {$name}s\n";
foo(NULL);
?>
<<<<<<< HEAD
And this is some content below
=======
And this is some content below
>>>>>>> 3c8515c4416a5c067735897bd2477625ce122fd5
