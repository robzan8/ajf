# Ajf Forms

Ajf uses a json-based format to describe forms, which is documented here.

The format is relatively low level; while it is possible to write forms as jsons by hand,
we provide a couple of tools that make the creation and maintenance of forms more user-friendly:

- Forms can be easily written in excel following the [xlsform standard](https://github.com/gnucoop/formconv#introduction-to-xlsforms)
  and then converted to ajf forms using the command line utility [formconv](https://github.com/gnucoop/formconv)
  or the online converter <https://formconv.herokuapp.com/>.
- The [form builder](https://dev-mat.ajf.rocks/form-builder) is available,
  which provides a graphical user interface for modifying ajf forms.

## Basic Syntax

Let's start by describing a simple example form:

	{
		"nodes": [
			{
				"parent": 0,
				"id": 1,
				"name": "slide0",
				"label": "Personal Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 1,
						"id": 1001,
						"name": "name",
						"label": "What's your name?",
						"nodeType": 0,
						"fieldType": 0
					},
					{
						"parent": 1001,
						"id": 1002,
						"name": "age",
						"label": "How old are you?",
						"nodeType": 0,
						"fieldType": 2
					}
				]
			},
			{
				"parent": 1,
				"id": 2,
				"name": "slide1",
				"label": "Pet Information",
				"nodeType": 3,
				"nodes": [
					{
						"parent": 2,
						"id": 2001,
						"name": "pet_name",
						"label": "What's your pet's name?",
						"nodeType": 0,
						"fieldType": 0
					},
					{
						"parent": 2001,
						"id": 2002,
						"name": "pet_age",
						"label": "How old is it?",
						"nodeType": 0,
						"fieldType": 2
					}
				]
			}
		]
	}

You are encouraged to see how the above form is rendered by setting its form schema in the [Ajf Demo page](https://dev-app.ajf.rocks/mat-forms).

Ajf forms are composed of "nodes".
Nodes are most commonly slides (with `nodeType` 3) or fields (with `nodeType` 0);
other node types will be described later.
The example form consists of two slides, each one containing two fields.

Fields also have a type.
In this form, we have text fields (`fieldType` 0) and numeric fields (`fieldType` 2);
many other field types are available, to deal with different user inputs, like dates, files and multiple choice questions.

Every node has a "name" and a "label".
`name` is used as a string identifier of the node;
`label` is the text shown to the user when the form is rendered.

Every node also has a numerical "id" and a "parent".
`id` can be any positive number, as long as it's unique in the form.
`parent` typically refers to the `id` of the node immediately above
(this can be different in forms with conditional branches, explained later).
Note that, in the example, node 1002 has node 1001 as parent and not node 1.
The first slide in the form must have `parent` 0.
