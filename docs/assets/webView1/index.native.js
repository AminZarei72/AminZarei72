(function() {
  try{
    /* ---------------------------------- */
     /* ========================================= */
     document.addEventListener('message',function (e2) {
      handleMessagesFromParent(e2); 
  });  

     /* ---------------------------------- */
    function sendMessageToParent(data) {
      window.ReactNativeWebView.postMessage(JSON.stringify(
        {
          id: 'child1',
          data: data,
        }
      ))
    }
    /* ========================================= */
    var onParentMessage = function (data) {
      if (data.event == 'rerenderWholeNetwork') {
        reRender_visNet1(data.content)
      } else {
        // sendMessageToParent(['this event is not supported',data])
        console.warn('this event is not supported', data)
      }
    }
    /* ---------------------------------- */
    function handleMessagesFromParent(event) {
      let parsedMessage = null
      try {
        parsedMessage = event.data ? JSON.parse(event.data) : null
      } catch (error) {
        console.error(
          'err on json parsing,data:',
          event.data,
          ';errorMessage :',
          error
        )
        alert(JSON.stringify([error,]))
      }
      if (parsedMessage && parsedMessage.id == 'parent') {/* todo:use a valid id like key or something(forse it in input or use key) */
        onParentMessage.call(false, parsedMessage.data ? parsedMessage.data : null)
      }
    }
   
  /* ---------------------------------- */
  function reRender_visNet1(params) {
    var network = new vis.Network(
      document.getElementById("mynetwork") 
      , {
        nodes: new vis.DataSet(params.nodes),
        edges: new vis.DataSet(params.edges),
      },
      params.options
      );

      network.on('selectNode', function (item) {
        var id = item.nodes[0];
        console.warn(id);
        sendMessageToParent({ event: 'userPressedANode', content: { id: id } });
      });

      network.fit({
        animation:true,
      });

    }
  /* ---------------------------------- */
    sendMessageToParent({ event: 'imReady', content: null });
  /* ---------------------------------- */
  }catch(e){
    alert(JSON.stringify(['err',e]));
  }
return null
  })();
