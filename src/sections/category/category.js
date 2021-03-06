/*
 * Dependencies
 */
import Events from "modules/core/events.js";
import Vue from "vue";
import TaskCategories from "modules/api/task-categories.js";
import TaskLists from "modules/api/task-lists.js";
import template from "./category.html";
import todoList from "components/todo-list/todo-list.js";

var view;

export function init(route)
{
  view = new Vue({
    el: "#main",
    replace: false,
    template: template,
    data: {
      category:  null,
      taskLists: []
    },
    components: {
      "component-todo-list": todoList
    },
    created: function() {

      TaskCategories.fetch({ idcategory: route.params.categoryID }).then(
        this.onTaskCategoryFetchSuccess.bind(this),
        this.onTaskCategoryFetchError.bind(this)
      );
    },
    ready: function() {

      Events.emit("section:loaded");
    },
    methods: {

      addTaskList: function(list) {

        list.category_idcategory = this.category.idcategory;
        TaskLists.create(list).then(
          this.onTaskListCreateSuccess.bind(this),
          this.onTaskListCreateError.bind(this)
        );
      },
      onAddTaskList: function(e) {

        var taskListName;

        taskListName = e.target.value;
        if (taskListName.length > 0)
        {
          this.addTaskList({ name: taskListName });
          e.target.value = "";
        }
      },
      onTaskCategoryFetchError: function(e) {

        console.error("Une erreur a eu lieu lors des informations de la catégorie de tâche choisie. Voir exception ci-dessous :");
        console.log(e);
      },
      onTaskCategoryFetchSuccess: function(response) {

        if (response.count === 1)
        {
          this.category = response.data[0];
          TaskLists.fetchByCategory(this.category).then(
            this.onTaskListsFetchSuccess.bind(this),
            this.onTaskListsFetchError.bind(this)
          );
        }
      },
      onTaskListCreateError: function(e) {

        console.error("Une erreur a eu lieu lors de la création d'une liste de tâches. Voir exception ci-dessous :");
        console.log(e);
      },
      onTaskListCreateSuccess: function(response) {

        if (response.count === 1)
        {
          this.taskLists.push(response.data[0]);
        }
      },
      onTaskListsFetchError: function(e) {

        console.error("Une erreur a eu lieu lors de la récupération des listes de tâches. Voir exception ci-dessous :");
        console.log(e);
      },
      onTaskListsFetchSuccess: function(response) {

        this.taskLists = response.data;
      }
    }
  });
}
export function destroy()
{
  view.$destroy();
  Events.emit("section:destroyed");
}
