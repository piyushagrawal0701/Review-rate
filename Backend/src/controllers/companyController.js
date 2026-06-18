const Company = require("../models/Company");
const Review = require("../models/Review");
const cloudinary = require("../config/cloudinary");
const uploadToCloudinary = require("../config/uploadToCloudinary");

const createCompany = async (req, res) => {
  try {
    const { name, description, location, city, foundedOn } = req.body;

    if (!name || !location || !city || !foundedOn) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const existingCompany = await Company.findOne({
      name: {
        $regex: `^${name}$`,
        $options: "i",
      },
    });

    if (existingCompany) {
      return res.status(409).json({
        success: false,
        message: "Company already exists",
      });
    }

    let logoUrl = "";

    // ✅ CLOUDINARY FIX HERE
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      logoUrl = uploadResult.secure_url;
    }
    console.log("FILE EXISTS:", !!req.file);
    console.log("FILE SIZE:", req.file?.buffer?.length);
    const company = await Company.create({
      name,
      logo: logoUrl,
      description,
      location,
      city,
      foundedOn,
    });

    return res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    console.error("CREATE COMPANY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getCompanies = async (req, res) => {
  try {
    const { search, city, sort } = req.query;

    let query = {};

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (city) {
      query.city = city;
    }

    let companies = await Company.find(query).lean();

    const companiesWithRatings = await Promise.all(
      companies.map(async (company) => {
        const stats = await Review.aggregate([
          {
            $match: {
              companyId: company._id,
            },
          },
          {
            $group: {
              _id: null,
              averageRating: {
                $avg: "$rating",
              },
              totalReviews: {
                $sum: 1,
              },
            },
          },
        ]);

        return {
          ...company,
          averageRating: stats[0]?.averageRating?.toFixed(1) || 0,
          totalReviews: stats[0]?.totalReviews || 0,
        };
      }),
    );

    if (sort === "name") {
      companiesWithRatings.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sort === "rating") {
      companiesWithRatings.sort((a, b) => b.averageRating - a.averageRating);
    }

    res.status(200).json({
      success: true,
      count: companiesWithRatings.length,
      data: companiesWithRatings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    const stats = await Review.aggregate([
      {
        $match: {
          companyId: company._id,
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
          totalReviews: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        company,
        averageRating: stats[0]?.averageRating?.toFixed(1) || 0,
        totalReviews: stats[0]?.totalReviews || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
};
