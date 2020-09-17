import Component from "vue-class-component";
import { Sections } from "fsxa-ui";
import { NavigationData, CAASImageReference } from "fsxa-api";
import { FSXAGetters } from "@/store";
import BaseSection from "./BaseSection";

export interface Payload {
  pt_text: string;
  pt_picture?: CAASImageReference;
  pageId: string;
}
@Component({
  name: "HeaderSection",
})
class HeaderSection extends BaseSection<Payload> {
  get navigationData(): NavigationData {
    return this.$store.getters[FSXAGetters.navigationData];
  }

  render() {
    const currentPage = this.navigationData.idMap[this.payload.pageId];
    return (
      <Sections.HeaderSection
        title={this.payload.pt_text}
        breadcrumbs={
          currentPage
            ? currentPage.parentIds.map(parentId => {
                const page = this.navigationData.idMap[parentId];
                return {
                  label: page.label || "",
                  path: page.seoRoute,
                  referenceId: parentId,
                  referenceType: "PageRef",
                };
              })
            : []
        }
        backgroundImage={
          this.payload.pt_picture?.resolutions.ORIGINAL
            ? {
                src: this.payload.pt_picture.resolutions.ORIGINAL.url,
                dimensions: {
                  width: this.payload.pt_picture.resolutions.ORIGINAL.width,
                  height: this.payload.pt_picture.resolutions.ORIGINAL.height,
                },
              }
            : undefined
        }
        handleItemClick={(item: any) =>
          this.handleRouteChangeRequest({ pageId: item.referenceId })
        }
      />
    );
  }
}
export default HeaderSection;
