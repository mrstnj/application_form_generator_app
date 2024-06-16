require "rails_helper"

RSpec.describe FormItemsController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/form_items").to route_to("form_items#index")
    end

    it "routes to #show" do
      expect(get: "/form_items/1").to route_to("form_items#show", id: "1")
    end


    it "routes to #create" do
      expect(post: "/form_items").to route_to("form_items#create")
    end

    it "routes to #update via PUT" do
      expect(put: "/form_items/1").to route_to("form_items#update", id: "1")
    end

    it "routes to #update via PATCH" do
      expect(patch: "/form_items/1").to route_to("form_items#update", id: "1")
    end

    it "routes to #destroy" do
      expect(delete: "/form_items/1").to route_to("form_items#destroy", id: "1")
    end
  end
end
