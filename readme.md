# cnc-mgmt
A web-based application to match tools, materials, and designs with .nc files

## Concept
Creating a design for a CNC machine involves a lot of coordination. First is of course the design. However, there are a lot of other factors that determine how that design becomes a reality. If you have multiple CNC machines, you need to create the gcode for that machine. Then, there is the material the design will be cut in to. Finally, there are the tools that will be used to do the machining. 

Keeping all of these factors together is the goal of this project. Once the design is complete, the gcode is generated. The gcode's `.nc` file is uploaded and you can add a descriptive title, an image of the design, and most importantly, the machine, tool, and material selections used when teh gcode was generated are all associated with the file.

Now, when you get ready to fire up the CNC machine, you open the "cnc-mgmt" app to find the design you want. From there, you can download the file and know which tools to have ready avoiding broken bits, incorrect paths, etc.
