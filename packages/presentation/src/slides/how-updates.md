# Updating the DOM

```diff
 // let domNode = document.createElement('button');
 // domNode.className = 'blue';
 // domContainer.appendChild(domNode);
 ReactDOM.render(
   <button className="blue" />,
   document.getElementById('container')
 );

+// Can reuse host instance? Yes! (button → button)
+// domNode.className = 'red';
 ReactDOM.render(
   <button className="red" />,
   document.getElementById('container')
 );

+// Can reuse host instance? No! (button → p)
 // domContainer.removeChild(domNode);
 // domNode = document.createElement('p');
 // domNode.textContent = 'Hello';
 // domContainer.appendChild(domNode);
 ReactDOM.render(
   <p>Hello</p>,
   document.getElementById('container')
 );

+// Can reuse host instance? Yes! (p → p)
+// domNode.textContent = 'Goodbye';
 ReactDOM.render(
   <p>Goodbye</p>,
   document.getElementById('container')
 );
```
