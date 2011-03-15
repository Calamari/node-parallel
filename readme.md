# node-parallel - Parallelize async calls and do something with the results at the end

## Examples:

    var p = new Parallel();
    doSomethingAsync(p.recv('myResult'));
    doMoreAsync(p.recv('anotherResult'));
    p.run(function(result) {
      result.myResult; // result of doSomethingAsync
      result.anotherResult; // result of doMoreAsync
    });
