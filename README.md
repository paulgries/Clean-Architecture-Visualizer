# Clean-Architecture-Visualizer

Imagine an app that allows exploration of an application using a CA engine-like diagram where each use case is in a different layer.

## Features

* The use case interactors are in a list, and selecting one makes that layer visible.
* Each layer shows the CA components for that interactor.
* Hovering over / clicking a box reveals that component's code
  * This includes any classes that the interactor requires, from the View to the Data layer and everything in between
* Component responsibilities are shown on hover
  * E.g., "The Controller is responsible for taking raw user input and transforming it into a format required by the interactor."
  * All these are from the point of view of the Interactor
* Probably use package by component to make it easier to identify the various CA parts
* I wonder if we could do sequence diagrams?