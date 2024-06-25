import { AllImage } from "@/assets/AllImge";
import { IFileAfterUpload } from "@/types/globalType";

export const imageLinkGeneratorByObject = (imageObject?: IFileAfterUpload) => {
  if (imageObject?.server_url) {
    return (
      process.env.NEXT_PUBLIC_API_ONLY_BASE_URL + "/" + imageObject?.server_url
    );
  } else if (imageObject?.url) {
    return imageObject?.url;
  } else {
    return AllImage.notFoundImage;
  }
};
